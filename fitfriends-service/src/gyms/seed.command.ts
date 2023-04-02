
import {Command, CommandRunner, Option} from 'nest-commander';
import * as fs from 'fs';
import {GymsService} from './gyms.service';
import {Gym} from 'src/types/gym.interface';

@Command({
  name: 'seed',
  description: 'Seeding DB'
})
export class SeedCommand extends CommandRunner {
  constructor(
    private readonly gymsService: GymsService
  ) {
    super()
  }

  async run(passedParams: string[]): Promise<void> {
    const file = passedParams[0];
    const data = fs.readFileSync(file, 'utf8');
    const parsedData = JSON.parse(data) as Gym[];

    try {
      await this.gymsService.seed(parsedData);
      console.log('The DB has been successfully filled!');
    } catch(error) {
      console.error(error);
    }
  }

  @Option({
    flags: '-f, --file <file_path>',
    description: 'Seeding data file path',
  })
  parseString(val: string): string {
    return val;
  }
}
