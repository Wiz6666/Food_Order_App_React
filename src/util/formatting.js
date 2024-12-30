// 格式化货币

// 将数字转换为货币格式
// 例如 1234.56 转换为 $1,234.56
export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});     