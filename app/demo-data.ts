export type VehicleCategory = "Innova Crysta" | "Toyota Innova" | "Swift Dzire" | "Maruti Ertiga" | "Toyota Fortuner" | "Tempo Traveller" | "Premium Sedan";
export type BookingStatus = "Enquiry" | "Confirmed" | "Vehicle Assigned" | "On Trip" | "Completed" | "Cancelled" | "Reserved";

export type Vehicle = { id:string; name:string; reg:string; category:VehicleCategory; seats:number; driverId:string; branch:string; location:string; rate:number; maintenance?:{from:string;to:string;reason:string}; };
export type Driver = { id:string; name:string; phone:string; license:string; licenseExpiry:string; status:"Available"|"On Trip"|"Leave"; vehicleId:string; trips:number; };
export type Customer = { id:string; name:string; phone:string; email:string; trips:number; spending:number; outstanding:number; };
export type Booking = { id:string; customerId:string; customerName:string; phone:string; vehicleId:string; driverId:string; pickup:string; returnAt:string; from:string; to:string; total:number; advance:number; status:BookingStatus; source:"Website"|"Phone"|"WhatsApp"|"Corporate"; };

const pads=(n:number)=>String(n).padStart(2,"0");
const driverNames=["Rajesh Sharma","Suresh Yadav","Ramesh Verma","Manoj Patel","Dinesh Solanki","Arjun Singh","Vijay Rathore","Mukesh Pawar","Sanjay Thakur","Deepak Jain","Anil Chouhan","Ravi Mishra","Gopal Yadav","Mahesh Soni","Nitin Parmar","Sunil Meena","Jitendra Joshi","Kailash Gurjar","Ajay Kushwah","Pradeep Tomar","Hemant Sen","Rohit Bansal","Ashok Malviya","Dharmendra Pal","Lokesh Sharma"];
const customerNames=["Amit Jain","Rahul Sharma","Neha Agrawal","Vikram Singh","Pooja Mehta","Rohan Patel","Kavita Joshi","Ankit Tiwari","Priya Shah","Mohit Bhandari","Sakshi Verma","Harsh Gupta","Nidhi Soni","Rajat Rathore","Komal Jain","Manish Yadav","Aarav Mishra","Simran Kaur","Naman Agrawal","Isha Patel"];

const specs:{category:VehicleCategory;count:number;seats:number;rate:number;prefix:string}[]=[
 {category:"Innova Crysta",count:8,seats:7,rate:22,prefix:"CR"},{category:"Toyota Innova",count:5,seats:7,rate:18,prefix:"IN"},
 {category:"Swift Dzire",count:8,seats:4,rate:12,prefix:"DZ"},{category:"Maruti Ertiga",count:6,seats:6,rate:16,prefix:"ER"},
 {category:"Toyota Fortuner",count:5,seats:7,rate:35,prefix:"FO"},{category:"Tempo Traveller",count:4,seats:17,rate:30,prefix:"TT"},
 {category:"Premium Sedan",count:4,seats:4,rate:28,prefix:"PS"},
];

export const drivers:Driver[]=driverNames.map((name,i)=>({id:`DRV-${pads(i+1)}`,name,phone:`98${26000000+i*137}`.slice(0,10),license:`MP09 2018${pads(i+1)}${pads(74-i)}`,licenseExpiry:`202${7+i%3}-${pads((i%12)+1)}-15`,status:i===14||i===21?"Leave":i<7?"On Trip":"Available",vehicleId:`VEH-${pads((i%40)+1)}`,trips:42+i*3}));

export const vehicles:Vehicle[]=[];
let vehicleIndex=0;
for(const spec of specs){for(let i=1;i<=spec.count;i++){vehicleIndex++;vehicles.push({id:`VEH-${pads(vehicleIndex)}`,name:`${spec.category} ${pads(i)}`,reg:`MP09 ${spec.prefix} ${pads(1200+vehicleIndex*83)}`,category:spec.category,seats:spec.seats,driverId:`DRV-${pads(((vehicleIndex-1)%25)+1)}`,branch:vehicleIndex%7===0?"Ujjain":"Indore HQ",location:vehicleIndex%4===0?"Indore Airport":"Indore",rate:spec.rate,...(vehicleIndex===17?{maintenance:{from:"2026-08-20T09:00",to:"2026-08-24T18:00",reason:"Scheduled service"}}:{}),...(vehicleIndex===23?{maintenance:{from:"2026-08-22T08:00",to:"2026-08-25T18:00",reason:"Clutch repair"}}:{})});}}

export const customers:Customer[]=Array.from({length:80},(_,i)=>({id:`CUS-${String(i+1).padStart(3,"0")}`,name:`${customerNames[i%customerNames.length]}${i>=20?` ${Math.floor(i/20)+1}`:""}`,phone:`9${826000000+i*731}`.slice(0,10),email:`customer${i+1}@example.in`,trips:1+(i*7)%18,spending:18500+(i*13750)%245000,outstanding:i%5===0?6000+(i*350)%18000:0}));

const routes=[["Vijay Nagar, Indore","Bhopal"],["Indore Airport","Ujjain"],["Palasia, Indore","Udaipur"],["Rau, Indore","Omkareshwar"],["Indore","Jaipur"],["Indore","Dewas"],["Indore","Ahmedabad"],["Indore Airport","Maheshwar"]];
const coreCrysta=[0,1,2,4,6].map((vehiclePos,i):Booking=>({id:`STT-2026-${pads(84+i)}`,customerId:customers[i].id,customerName:customers[i].name,phone:customers[i].phone,vehicleId:vehicles[vehiclePos].id,driverId:vehicles[vehiclePos].driverId,pickup:`2026-08-${i%2?"21":"22"}T${pads(6+i)}:00`,returnAt:`2026-08-${i%2?"25":"24"}T${pads(17+i)}:00`,from:routes[i][0],to:routes[i][1],total:15500+i*1800,advance:6500+i*700,status:i===1?"On Trip":"Confirmed",source:i%2?"WhatsApp":"Phone"}));

const generated:Booking[]=Array.from({length:55},(_,i)=>{const vehiclePos=8+(i%32);const day=1+(i*3)%45;const month=day<=31?8:9;const dateDay=day<=31?day:day-31;const pickup=new Date(2026,month-1,dateDay,6+(i%9),i%2?30:0);const ret=new Date(pickup.getTime()+(8+(i%4)*14)*3600000);const route=routes[i%routes.length];const customer=customers[(i+8)%customers.length];return {id:`STT-2026-${pads(100+i)}`,customerId:customer.id,customerName:customer.name,phone:customer.phone,vehicleId:vehicles[vehiclePos].id,driverId:`DRV-${pads(9+(i%17))}`,pickup:localIso(pickup),returnAt:localIso(ret),from:route[0],to:route[1],total:7200+(i%9)*1750,advance:2500+(i%5)*1500,status:pickup<new Date(2026,7,21)?"Completed":i%11===0?"Reserved":i%4===0?"On Trip":"Confirmed",source:["Website","Phone","WhatsApp","Corporate"][i%4] as Booking["source"]};});

export const initialBookings:Booking[]=[...coreCrysta,...generated];

export function localIso(date:Date){return `${date.getFullYear()}-${pads(date.getMonth()+1)}-${pads(date.getDate())}T${pads(date.getHours())}:${pads(date.getMinutes())}`;}
export function overlaps(aStart:string,aEnd:string,bStart:string,bEnd:string,bufferMinutes=0){return new Date(aStart).getTime()<new Date(bEnd).getTime()+bufferMinutes*60000&&new Date(aEnd).getTime()>new Date(bStart).getTime()-bufferMinutes*60000;}
export function formatDateTime(value:string){return new Intl.DateTimeFormat("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"numeric",minute:"2-digit",hour12:true}).format(new Date(value));}
export function money(value:number){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);}
