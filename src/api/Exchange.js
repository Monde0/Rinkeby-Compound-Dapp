export async function getETHPrice() {
    const response = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/spot');
    const data = await response.json();
    return data.data.amount;
}