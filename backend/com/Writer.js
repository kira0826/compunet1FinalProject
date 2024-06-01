import fs from 'fs/promises';

async function writeSomethingToFile(path, variableName, data) {
  try {
    const fileContent = `export const ${variableName} = ${JSON.stringify(data, null, 2)};`;
    await fs.writeFile(path, fileContent, 'utf8');
  } catch (error) {
    console.error("Error writing to file:", error);
    throw error;
  }
}

export default writeSomethingToFile;
