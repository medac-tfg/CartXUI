export const modifyCSP = (defaultSession: Electron.Session) => {
  defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = details.responseHeaders;
    const cspHeaders =
      responseHeaders["Content-Security-Policy"] ||
      responseHeaders["content-security-policy"];

    if (cspHeaders) {
      const existingCSP = cspHeaders[0]; // Get the current CSP header

      // Check if img-src is already in the CSP
      if (/img-src [^;]+/.test(existingCSP)) {
        // Replace existing img-src with your custom directive
        const updatedCSP = existingCSP.replace(
          /img-src [^;]+/,
          "img-src 'self' https://placehold.co/ data:"
        );

        callback({
          responseHeaders: {
            ...responseHeaders,
            "Content-Security-Policy": [updatedCSP],
          },
        });
      } else {
        // Append img-src to the CSP if it doesn't exist
        const updatedCSP = `${existingCSP}; img-src 'self' https://placehold.co/ data:`;

        callback({
          responseHeaders: {
            ...responseHeaders,
            "Content-Security-Policy": [updatedCSP],
          },
        });
      }
    } else {
      // If no CSP exists, return default CSP
      callback({
        responseHeaders: {
          ...responseHeaders,
        },
      });
    }
  });
};
