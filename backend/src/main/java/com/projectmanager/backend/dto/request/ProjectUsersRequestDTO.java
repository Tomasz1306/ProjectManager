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

public class ProjectUsersRequestDTO {
    private Long userId;
    private Long projectId;
}
