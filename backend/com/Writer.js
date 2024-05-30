
import fs from 'fs';
import path from 'path';

function writeSomethingToFile(pathFile, variableName, variable) {

    const filePath = path.join(process.cwd(), pathFile);

    console.log(filePath);  

    const content = `const ${String(variableName)} = ${JSON.stringify(variable, null, 2)};\n\nexport { ${variableName} };`;
    console.log(content);  

    fs.writeFileSync(filePath, content, 'utf-8');
}

export default writeSomethingToFile;