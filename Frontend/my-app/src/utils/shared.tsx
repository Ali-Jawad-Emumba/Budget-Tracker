export const checkAndThrowError = (errors: any, errorFor: string): any => {
  if (errors[errorFor])
    return (
      <div className="errors poppins-regular">
        {(errors[errorFor] as any)?.message}
      </div>
    );
};

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
