namespace Church.Domain.Common;

public sealed class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public T? Data { get; set; }
    public string? Error { get; set; }

    public static ApiResponse<T> Ok(T? data, string message = "success") => new()
    {
        Success = true,
        Message = message,
        Data = data,
        Error = null
    };

    public static ApiResponse<T> Fail(string message, string? error = null) => new()
    {
        Success = false,
        Message = message,
        Data = default,
        Error = error ?? message
    };
}