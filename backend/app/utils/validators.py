import re


def is_valid_email(email):
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return re.match(pattern, email) is not None


def validate_required_fields(data, required_fields):
    if not data:
        return False, "Request body is required"

    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return False, f"Missing required fields: {', '.join(missing_fields)}"

    return True, None


def validate_non_empty_string(value, field_name):
    if not value or not str(value).strip():
        return False, f"{field_name} cannot be empty"
    return True, None


def validate_positive_number(value, field_name):
    try:
        num = float(value)
        if num <= 0:
            return False, f"{field_name} must be greater than zero"
        return True, num
    except (ValueError, TypeError):
        return False, f"{field_name} must be a valid number"
