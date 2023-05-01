import fs from 'fs';
import { DocumentNode } from 'graphql';
import path from 'path';
import { gql } from 'apollo-server-express';

export class SchemaTools {
  public static loadSchemas(folder: string): DocumentNode {
    const files = SchemaTools.listFilesOfFolder(folder);
    const fullContent = files
      .map((file) => {
        const content = fs.readFileSync(file, { encoding: 'utf-8' });
        console.log(`[loadSchemas] Loaded ${file}.`);
        return content;
      })
      .reduce((content, fileContent) => `${content}\n${fileContent}`, '');
    return gql(fullContent);
  }

  private static browseDirectory(dir: string, fileList?: string[]): string[] {
    const files = fs.readdirSync(dir);
    let fileListNotNull = fileList || [];
    files.forEach((file) => {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        fileListNotNull = SchemaTools.browseDirectory(
          path.join(dir, file),
          fileListNotNull
        );
      } else {
        fileListNotNull.push(path.join(dir, file));
      }
    });
    return fileListNotNull;
  }

  private static listFilesOfFolder(folder: string): string[] {
    return SchemaTools.browseDirectory(folder);
  }
}
