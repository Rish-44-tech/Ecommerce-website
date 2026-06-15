export default function formatPrice(amountCents){
    return `$${(amountCents / 100).toFixed(2)}`;
}