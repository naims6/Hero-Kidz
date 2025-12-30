import { CartMongoType } from "@/types/CartMongoType";

export const orderConfirmationEmail = ({
  fullName,
  items,
}: {
  fullName: string;
  items: CartMongoType[];
}) => {
  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px 0;">${item.title}</td>
          <td style="padding: 8px 0;">${item.quantity}</td>
          <td style="padding: 8px 0;">$${item.price * item.quantity}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2>Thank you for your order, ${fullName}!</h2>

      <p>We’ve received your order and are preparing it for processing.</p>

      <h3>Order Details</h3>
      <table width="100%" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th align="left">Product</th>
            <th align="left">Qty</th>
            <th align="left">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <p style="margin-top: 20px;">
        If you have any questions, feel free to reply to this email.
      </p>

      <p>
        Best regards,<br />
        <strong>Your Hero Kidz</strong>
      </p>
    </div>
  `;
};
