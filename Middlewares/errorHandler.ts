export default async (context: any, next: any) => {
    try {
        await next()
    } catch (error) {
        const { response } = context;
        response.status = 500;
        response.body = {
            success: false,
            msg: error.message
        };
    }
};
