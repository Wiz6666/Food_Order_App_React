// feat: Add Button component and integrate with Header
// - Added a reusable Button component in UI folder.
// - Updated Header to use the new Button component for the Cart button.
// - Integrated MealItem component in Meals for better structure.
// - Ensured data fetching from backend is working correctly.

export default function Button({ children, textOnly, className, ...props }) {
    let cssClasses = textOnly ? 'text-button' : 'button';
    cssClasses += ' ' + className;

    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    );
}
