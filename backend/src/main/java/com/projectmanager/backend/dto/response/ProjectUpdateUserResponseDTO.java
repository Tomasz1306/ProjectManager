package com.projectmanager.backend.dto.response;

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

public class ProjectUpdateUserResponseDTO {
    private String information;
    private boolean status;
    private ProjectUserDTO projectUser;
}
