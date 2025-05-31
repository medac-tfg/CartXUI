import * as tf from "@tensorflow/tfjs-node";
import * as poseDetection from "@tensorflow-models/pose-detection";
import NodeWebcam from "node-webcam";
import path from "path";
import fs from "fs";

let detector: poseDetection.PoseDetector | null = null;

const initializePoseDetector = async () => {
  if (!detector) {
    const model = poseDetection.SupportedModels.MoveNet;
    detector = await poseDetection.createDetector(model, {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    });
  }
  return detector;
};

const webcamOptions = {
  width: 640,
  height: 480,
  quality: 100,
  delay: 0,
  saveShots: false,
  output: "jpeg" as "jpeg",
  device: "2",
  callbackReturn: "buffer" as "buffer",
  verbose: false,
};

const webcam = NodeWebcam.create(webcamOptions);

export const getHumanPresence = async (): Promise<boolean> => {
  const timestamp = Date.now();
  const fileName = `pose_capture_${timestamp}.jpg`;
  const filePath = path.join(__dirname, fileName); // correct route

  try {
    await initializePoseDetector();

    // Capture image from webcam
    const imageBuffer = await captureImage(filePath);

    // Convert image to tensor
    const imageTensor = imageToTensor(imageBuffer);

    // Estimate poses
    const poses = await detector!.estimatePoses(imageTensor);
    imageTensor.dispose(); // Dispose tensor to free memory

    if (poses.length === 0) return false;

    // Very low threshold - will detect even uncertain body parts
    for (const pose of poses) {
      const anyKeypoints = pose.keypoints.filter(
        (kp) => kp.score && kp.score > 0.1
      ); // Very low threshold

      // Specific check for hand/arm keypoints (most likely to be visible)
      const handArmKeypoints = pose.keypoints.filter(
        (kp) =>
          (kp.name?.includes("wrist") ||
            kp.name?.includes("elbow") ||
            kp.name?.includes("shoulder")) &&
          kp.score &&
          kp.score > 0.2
      );

      if (handArmKeypoints.length > 0) {
        console.log(
          `Detected hand/arm parts: ${handArmKeypoints
            .map((kp) => kp.name)
            .join(", ")}`
        );
        return true;
      }

      if (anyKeypoints.length >= 2) {
        // At least 2 body parts detected
        console.log(
          `Detected ${anyKeypoints.length} body parts (low confidence)`
        );
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error in high sensitivity detection:", error);
    return false;
  } finally {
    // Clean up captured image file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

/**
 * Captures an image using node-webcam
 */
const captureImage = (filePath: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    webcam.capture(filePath, (err: Error | null, data: Buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const imageToTensor = (imageBuffer: Buffer): tf.Tensor3D => {
  // Decode image buffer into a tensor
  return tf.node.decodeImage(imageBuffer, 3) as tf.Tensor3D; // 3 for RGB
};
