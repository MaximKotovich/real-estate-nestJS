import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class ImagesService {
  constructor() {}

  async createFile(image): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve('src/common', 'images/temporary');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), image.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'error file load',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeFile(fileName: string) {
    fs.unlinkSync(`src/common/static/${fileName}`);
  }
}
