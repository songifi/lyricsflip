import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptProvider {
    // hash paassword 
    public async hashPassword(impPassword: string | Buffer): Promise<string> {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        return await bcrypt.hash(impPassword, salt)
    }

    // conpare passwords
    public async comparePasswords(passwordData: string, encryptedPassword: string): Promise<boolean> {
        return await bcrypt.compare(passwordData, encryptedPassword)
    }
}