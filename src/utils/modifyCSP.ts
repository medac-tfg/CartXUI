export const modifyCSP = (defaultSession: Electron.Session) => {
  defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = details.responseHeaders;
    if (!responseHeaders) {
      return callback({ responseHeaders });
    }

    const cspHeaders =
      responseHeaders["Content-Security-Policy"] ||
      responseHeaders["content-security-policy"];

    if (cspHeaders) {
      const existingCSP = cspHeaders[0];
      const imgSrcRegex = /(^|\s)img-src\s+[^;]+/i;
      let updatedCSP: string;

      if (imgSrcRegex.test(existingCSP)) {
        // Replace existing img-src directive
        updatedCSP = existingCSP.replace(
          imgSrcRegex,
          "img-src 'self' https://placehold.co/ data:"
        );
      } else {
        // Append img-src directive
        updatedCSP = `${existingCSP}; img-src 'self' https://placehold.co/ data:`;
      }

      return callback({
        responseHeaders: {
          ...responseHeaders,
          "Content-Security-Policy": [updatedCSP],
        },
      });
    }

    // If no CSP or empty CSP, just proceed without changes
    return callback({ responseHeaders });
  });
};
