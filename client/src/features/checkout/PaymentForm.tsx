import {StripeElementType} from "@stripe/stripe-js";

interface Props {
    cardState: { elementError: { [key in StripeElementType]?: string } };
    onCardInputChange: (event: any) => void;
}

export default function PaymentForm({cardState, onCardInputChange}: Props) {
    // const {control} = useFormContext();

    return <></>;
}
