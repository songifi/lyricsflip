import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
    // hash during signUp
    abstract hashPassword(impPassword: string | Buffer): Promise<string>

    // compare during signIn
    abstract comparePasswords(passwordData: string, encryptedPassword: string): Promise<boolean>
}