export declare abstract class HashingProvider {
    abstract hashPassword(impPassword: string | Buffer): Promise<string>;
    abstract comparePasswords(passwordData: string, encryptedPassword: string): Promise<boolean>;
}
