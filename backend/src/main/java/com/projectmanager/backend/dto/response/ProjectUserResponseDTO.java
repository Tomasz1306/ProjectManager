package com.projectmanager.backend.dto.response;

import com.projectmanager.backend.domain.ProjectUser;
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

public class ProjectUserResponseDTO {
    ProjectUserDTO projectUser;
}
