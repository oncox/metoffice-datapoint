import sitelist from '../common/Sitelist';
import capabilities from '../common/Capabilities';
import values from '../common/Values';
import Site from '../models/Site';
import WxobsReport from '../models/WxobsReport';
import Record from '../models/Record';
import { ILogger, ISite, IValues, IObservations } from '../../types';

export default (key: string, logger?: ILogger): IObservations => ({
  frequencies: ['hourly'],
  sitelist: (): Promise<Site[]> => {
    return sitelist(key, logger, 'wxobs');
  },
  capabilities: (): Promise<Date[]> => {
    return capabilities(key, logger, 'wxobs', 'hourly');
  },
  values: (options?: { site?: ISite; time?: Date }): Promise<Record<WxobsReport>[]> => {
    return new Promise((resolve, reject) => {
      values(key, logger, 'wxobs', 'hourly', options)
        .then((records) => {
          resolve(
            records.SiteRep.DV.Location.map((location: IValues) => new Record<WxobsReport>(WxobsReport, location)),
          );
        })
        .catch(reject);
    });
  },
});
