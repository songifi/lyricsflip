export declare class FindOneUserByEmailProvider {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository<User>);
    findOneUserByEmail(email: string): Promise<any>;
}
