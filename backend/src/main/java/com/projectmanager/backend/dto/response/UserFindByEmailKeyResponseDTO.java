package com.projectmanager.backend.dto.response;

import com.projectmanager.backend.domain.User;
import com.projectmanager.backend.dto.request.UserResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

//Lombok annotations//
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
// **************** //

public class UserFindByEmailKeyResponseDTO {
    List<UserResponseDTO> users;
}
