import bcrypt from 'bcrypt';

export const hashValue=async (val:string,rounds:number=8):Promise<string>=>{
    return await bcrypt.hash(val,rounds);
}

export const compareValue=async (val:string,hashedVal:string):Promise<boolean>=>{
    //compare method throws an error when false so have to catch it
    return await bcrypt.compare(val,hashedVal).catch(err=>false);
}