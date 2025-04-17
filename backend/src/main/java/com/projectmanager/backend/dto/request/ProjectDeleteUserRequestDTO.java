package com.projectmanager.backend.dto.request;

import com.projectmanager.backend.dto.response.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//Lombok annotations//
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
// **************** //

public class ProjectDeleteUserRequestDTO {
    private UserDTO user;
    private Long projectId;
    private UserDTO initiator;
}
