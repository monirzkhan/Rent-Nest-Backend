import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./modules/auth/auth.route";
import { landlordRoutes } from "./modules/landlordManagement/landlord.routes";
import { categoryRoutes } from "./modules/category/category.routes";
import { propertyRoutes } from "./modules/property/property.routes";
import { rentalRoutes } from "./modules/rentals/rental.routes";
import { reviewRoutes } from "./modules/review/review.routes";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { adminRoutes } from "./modules/admin/admin.routes";
import { paymentsRoutes } from "./modules/payment/payment.routes";
import config from "./config";
import { stripe } from "./lib/stripe";


const app: Application = express();

app.use(cors())
const endpointSecret = config.stripeWebhookEndpointSecret
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }))
// app.use('/api/payments/webhook', express.raw({ type: 'application/json' }), (request, response) => {
//     let event = request.body;

//     console.log("event checked", event);
//     console.log("Request Header", request.headers);
//     // Only verify the event if you have an endpoint secret defined.
//     // Otherwise use the basic event deserialized with JSON.parse
//     if (endpointSecret) {
//         // Get the signature sent by Stripe
//         const signature = request.headers['stripe-signature']!;
//         try {
//             event = stripe.webhooks.constructEvent(
//                 request.body,
//                 signature,
//                 endpointSecret
//             );
//         } catch (err : any) {
//             console.log(`⚠️  Webhook signature verification failed.`, err.message);
//             return response.sendStatus(400);
//         }
//     }

//     console.log("after try catch",event);

//     // Handle the event
//     switch (event.type) {
//         case 'payment_intent.succeeded':
//             const paymentIntent = event.data.object;
//             console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//             // Then define and call a method to handle the successful payment intent.
//             // handlePaymentIntentSucceeded(paymentIntent);
//             break;
//         case 'payment_method.attached':
//             const paymentMethod = event.data.object;
//             // Then define and call a method to handle the successful attachment of a PaymentMethod.
//             // handlePaymentMethodAttached(paymentMethod);
//             break;
//         default:
//             // Unexpected event type
//             console.log(`Unhandled event type ${event.type}.`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     response.send();


// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
    res.send({
        "Application_Name": "RentNest",
        "version": "1.0.0",
        "Author": "Md. Moniruzzaman",
        "E-mail": "mmonirz.dev@gmail.com"
    })

})

app.use('/api/auth/', authRoutes)
app.use('/api/landlord/', landlordRoutes)
app.use('/api/categories/', categoryRoutes)
app.use('/api/properties/', propertyRoutes)
app.use('/api/rentals/', rentalRoutes)
app.use('/api/reviews/', reviewRoutes)
app.use('/api/admin/', adminRoutes)
app.use('/api/payments/', paymentsRoutes)

app.use(notFound)
app.use(globalErrorHandler)

export default app;