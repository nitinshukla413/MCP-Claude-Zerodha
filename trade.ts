import { KiteConnect } from "kiteconnect";



const kc = new KiteConnect({ api_key: process.env.apiKey });

console.log(kc.getLoginURL());
export async function placeOrder(tradingsymbol: string, quantity: number, product: string, tag: string, order_type: string) {
    try {
        await kc.setAccessToken(process.env.accessToken);
        const profile = await kc.placeOrder(
            "regular",
            {
                exchange: "NSE",
                tradingsymbol: tradingsymbol,
                transaction_type: "BUY",
                quantity: quantity,
                product: product,
                tag: tag,
                order_type: order_type,
            }
        )
        console.log("Profile:", profile);
    } catch (err) {
        console.error(err);
    }
}
