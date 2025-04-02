package com.projectmanager.backend.dto.response;

import com.projectmanager.backend.domain.Project;
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

public class ProjectIdResponseDTO {
    Project project;
}
