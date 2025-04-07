package com.projectmanager.backend.dto.request;

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

public class ProjectCreateRequestDTO {
    private Long creatorId;
    private String name;
    private String description;
}
