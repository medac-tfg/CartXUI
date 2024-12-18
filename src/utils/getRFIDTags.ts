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
const getRFIDSensorParser = async (): Promise<ReadlineParser> => {
  await new Promise<void>((resolve, reject) => {
    port.flush((flushErr) => {
      if (flushErr) {
        console.error("Error flushing serial port:", flushErr.message);
        reject(flushErr);
      } else {
        console.log("Serial port buffer cleared.");
        resolve();
      }
    });
  });

  return parser;
};

/**
 * Scans for RFID tags within a defined period, extending the scan time upon each new detection.
 * @returns {Promise<Array<string>>} A promise that resolves to an array of unique RFID tags.
 */
export const getRFIDTags = (
  SCAN_TIME = 5000, // Time to initially scan for RFID tags (in ms)
  EXTEND_TIME = 2000 // Time to extend the scan upon new detections (in ms)
): Promise<Array<string>> => {
  const detectedTags = new Set<string>();

  return new Promise(async (resolve, reject) => {
    let sensorParser: ReadlineParser;

    try {
      sensorParser = await getRFIDSensorParser();
    } catch (error) {
      return reject(new Error("Failed to initialize RFID sensor parser."));
    }

    console.log(`Starting RFID scan for ${SCAN_TIME}ms...`);

    let scanTimeout: NodeJS.Timeout;

    const finishScanning = () => {
      sensorParser.off("data", handleData);
      console.log(`Scan complete. Detected tags: ${Array.from(detectedTags).join(", ")}`);
      resolve(Array.from(detectedTags));
    };

    const updateTimeout = () => {
      clearTimeout(scanTimeout);
      scanTimeout = setTimeout(finishScanning, EXTEND_TIME);
    };

    const handleData = (data: string) => {
      const cleanedData = data.trim().replace(/[^a-zA-Z0-9]/g, "");
      if (!cleanedData || detectedTags.has(cleanedData)) return;

      console.log(`Detected tag: ${cleanedData}`);
      detectedTags.add(cleanedData);
      updateTimeout(); // Extend the scan time upon new detection
    };

    sensorParser.on("data", handleData);

    // Set the initial scan timeout
    scanTimeout = setTimeout(finishScanning, SCAN_TIME);
  });
};