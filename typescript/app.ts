import log, { logArray as logA, appLog } from './log';
import * as logUtils from './log';

log(5);
logA([2, 3]);
appLog(4);

logUtils.default(5);
logUtils.logArray([2, 3]);
logUtils.appLog(5);
