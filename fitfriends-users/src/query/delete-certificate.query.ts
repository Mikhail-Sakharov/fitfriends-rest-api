import {IsOptional} from 'class-validator';

export class DeleteCertificateQuery {
  @IsOptional()
  public certificateUrl?: string;
}
