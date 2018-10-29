export default function(o: any) { console.log(o); }

export function logArray(o: any[]) { console.log(`Array (length: ${o.length}`, o); }

function appLog(o: any) { console.log('MyApp Log Entry', o); }

export { appLog };
