export class Hello {
    public static async sayHello(): Promise<string> {
        const content = 'hey from sdk';

        return content;
    }
}
