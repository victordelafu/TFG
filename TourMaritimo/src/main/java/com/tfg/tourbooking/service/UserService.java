package com.tfg.tourbooking.service;

import com.tfg.tourbooking.dto.LoginDto;
import com.tfg.tourbooking.dto.UserDto;
import com.tfg.tourbooking.model.User;

public interface UserService {
    boolean existsByEmail(String email);
    void registerUser(UserDto userDto);
    User authenticate(LoginDto loginDto) throws IllegalArgumentException;
}


