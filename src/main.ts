import { readFile } from "fs";

const sourcePath: string = process.argv[2];

readFile(sourcePath, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    interpret(data.toString("utf8"));
  }
});

const readChar = (): Promise<string> =>
  new Promise(resolve => {
    process.stdin.once("readable", () => {
      const input = process.stdin.read(1);
      resolve(input.toString());
    });
  });

const interpret = async (source: string): Promise<void> => {
  const cells: number[] = [];
  const cellsLength = 30 * 1000;

  for (let i = 0; i < cellsLength; i++) {
    cells[i] = 0;
  }

  let sourceIndex = 0;
  let cellIndex = 0;

  while (sourceIndex < source.length) {
    const char = source.charAt(sourceIndex);
    switch (char) {
      case "+":
        cells[cellIndex]++;
        break;
      case "-":
        cells[cellIndex]--;
        break;
      case "<":
        cellIndex--;
        if (cellIndex < 0) {
          throw new Error("Cell index was set to value less than 0.");
        }
        break;
      case ">":
        cellIndex++;
        if (cellIndex >= cellsLength) {
          throw new Error("Cell index was set to value greater than 30000.");
        }
        break;
      case ".":
        const output = String.fromCharCode(cells[cellIndex]);
        process.stdout.write(output);
        break;
      case ",":
        const input = await readChar();
        cells[cellIndex] = input.charCodeAt(0);
        break;
      case "[":
        if (cells[cellIndex] === 0) {
          while (source.charAt(sourceIndex) !== "]") {
            sourceIndex++;
          }
        }
        break;
      case "]":
        if (cells[cellIndex] !== 0) {
          while (source.charAt(sourceIndex) !== "[") {
            sourceIndex--;
          }
        }
        break;
    }
    sourceIndex++;
  }
};
