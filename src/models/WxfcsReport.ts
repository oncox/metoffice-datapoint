import Report from './Report';
import { IReport } from '../../types';

export default class WxfcsReport extends Report {
  F: number;

  Pp: number;

  U: number;

  constructor(startDate: Date, { F, Pp, U, ...report }: IReport) {
    super(startDate, report);

    this.F = parseFloat(`${F ?? 'NaN'}`);
    this.Pp = parseFloat(`${Pp ?? 'NaN'}`);
    this.U = parseFloat(`${U ?? 'NaN'}`);
  }
}
