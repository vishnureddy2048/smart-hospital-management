package com.hospital.smarthospital.dto;

import com.hospital.smarthospital.model.Role;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotNull
    private Role role;

    // Optional extra fields used when role = PATIENT or DOCTOR
    private String fullName;
    private String phoneNumber;
}
