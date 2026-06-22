export default function formatPrice(amountCents:number){
    return `$${(amountCents / 100).toFixed(2)}`;
}