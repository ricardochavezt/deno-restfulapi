export default async (context: any, next: any) => {
    const { request, response } = context;
    await next();
    const rt = response.headers.get("X-Response-Time");
    console.log(`${request.method} ${request.url.pathname} - ${rt}`)
}
