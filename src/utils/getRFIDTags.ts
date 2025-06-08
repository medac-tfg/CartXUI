import { SerialPort, ReadlineParser } from "serialport";

let port: SerialPort | null = null;
let parser: ReadlineParser | null = null;

/**
 * Opens the serial port if not already open
 */
const openSerialPort = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (port && port.isOpen) {
      resolve();
      return;
    }

    port = new SerialPort({
      path: process.env.RFID_SERIAL_PORT || "/dev/tty001",
      baudRate: 115200,
      parity: "none",
      stopBits: 1,
      dataBits: 8,
      autoOpen: false,
    });

    // Create a parser to read incoming data line by line
    parser = new ReadlineParser({ delimiter: "\n" });
    port.pipe(parser);

    // Handle errors
    port.on("error", (err) => {
      console.error("Serial port error:", err.message);
      reject(err);
    });

    // Open the serial port
    port.open((err) => {
      if (err) {
        console.error("Error opening serial port:", err.message);
        reject(err);
      } else {
        console.log("Serial port opened successfully");
        resolve();
      }
    });
  });
};

/**
 * Closes the serial port if open
 */
const closeSerialPort = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!port || !port.isOpen) {
      resolve();
      return;
    }

    console.log("Closing serial port...");
    port.close((err) => {
      if (err) {
        console.error("Error closing serial port:", err.message);
        reject(err);
      } else {
        console.log("Serial port closed.");
        port = null;
        parser = null;
        resolve();
      }
    });
  });
};

/**
 * Prepares the RFID sensor for reading by clearing residual data in the buffer.
 * @returns {ReadlineParser} The parser instance for processing RFID data.
 */
const getRFIDSensorParser = async (): Promise<ReadlineParser> => {
  await openSerialPort();

  if (!port || !parser) {
    throw new Error("Failed to initialize serial port");
  }

  await new Promise<void>((resolve, reject) => {
    port!.flush((flushErr) => {
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
      await closeSerialPort();
      return reject(new Error("Failed to initialize RFID sensor parser."));
    }

    console.log(`Starting RFID scan for ${SCAN_TIME}ms...`);

    let scanTimeout: NodeJS.Timeout;

    const finishScanning = async () => {
      sensorParser.off("data", handleData);
      console.log(
        `Scan complete. Detected tags: ${Array.from(detectedTags).join(", ")}`
      );

      // Close the serial port after scanning
      try {
        await closeSerialPort();
      } catch (error) {
        console.error("Error closing serial port after scan:", error);
      }

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

// Close the serial port gracefully on process exit
process.on("SIGINT", async () => {
  try {
    await closeSerialPort();
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
  }
  process.exit();
});

process.on("SIGTERM", async () => {
  try {
    await closeSerialPort();
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
  }
  process.exit();
});
