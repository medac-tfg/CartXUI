import { SerialPort, ReadlineParser } from "serialport";

const port = new SerialPort({
  path: process.env.RFID_SERIAL_PORT || "/dev/tty001",
  baudRate: 115200,
  parity: "none",
  stopBits: 1,
  dataBits: 8,
  autoOpen: false,
});

// Create a parser to read incoming data line by line
const parser = new ReadlineParser({ delimiter: "\n" });
port.pipe(parser);

// Open the serial port
port.open((err) => {
  if (err) {
    return console.error("Error opening serial port:", err.message);
  }
  console.log("Serial port opened successfully");
});

// Handle errors
port.on("error", (err) => {
  console.error("Serial port error:", err.message);
});

// Close the serial port gracefully on process exit
process.on("SIGINT", () => {
  console.log("Closing serial port...");
  port.close((err) => {
    if (err) {
      console.error("Error closing serial port:", err.message);
    } else {
      console.log("Serial port closed.");
    }
    process.exit();
  });
});

/**
 * Prepares the RFID sensor for reading by clearing residual data in the buffer.
 * @returns {ReadlineParser} The parser instance for processing RFID data.
 */
const getRFIDSensorParser = (): ReadlineParser => {
  // Flush the serial port buffer to clear any residual data
  port.flush((flushErr) => {
    if (flushErr) {
      console.error("Error flushing serial port:", flushErr.message);
    } else {
      console.log("Serial port buffer cleared.");
    }
  });

  return parser;
};

/**
 * Scans for RFID tags within a defined period, extending the scan time upon each new detection.
 * @returns {Promise<Set<string>>} A set of unique RFID tags.
 */
export const getRFIDTags = (
  SCAN_TIME = 5000, // Time to initially scan for RFID tags (in milliseconds)
  EXTEND_TIME = 2000 // Time to extend the scan upon new detections (in milliseconds)
): Promise<Array<string>> => {
  const detectedTags = new Set<string>();

  return new Promise((resolve, reject) => {
    const parser = getRFIDSensorParser();
    if (!parser) {
      return reject(new Error("Failed to initialize RFID sensor parser."));
    }

    let scanTimeout: NodeJS.Timeout;

    const updateTimeout = () => {
      clearTimeout(scanTimeout);
      scanTimeout = setTimeout(() => {
        parser.off("data", handleData);
        resolve(Array.from(detectedTags));
      }, EXTEND_TIME);
    };

    const handleData = (data: string) => {
      const cleanedData = data.trim().replace(/[^a-zA-Z0-9]/g, "");
      if (!cleanedData || detectedTags.has(cleanedData)) return;

      detectedTags.add(cleanedData);
      updateTimeout(); // Extend the scan time
    };

    // Start listening for data
    parser.on("data", handleData);

    // Initialize the scan timeout
    scanTimeout = setTimeout(() => {
      parser.off("data", handleData);
      resolve(Array.from(detectedTags));
    }, SCAN_TIME);
  });
};
