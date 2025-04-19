package com.projectmanager.backend.dto.request;

import com.projectmanager.backend.domain.Role;
import com.projectmanager.backend.dto.response.ProjectUserDTO;
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

public class ProjectUpdateUserRequestDTO {
    private ProjectUserDTO initiator;
    private ProjectUserDTO projectUserToUpdate;
    private Long projectId;
    private Role newRole;
}
