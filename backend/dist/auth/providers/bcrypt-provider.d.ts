export declare class BcryptProvider {
    hashPassword(impPassword: string | Buffer): Promise<string>;
    comparePasswords(passwordData: string, encryptedPassword: string): Promise<boolean>;
}
