
package com.projectmanager.backend.serviceTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.projectmanager.backend.dto.request.ProjectDeleteRequestDTO;
import com.projectmanager.backend.dto.response.ProjectDeleteResponseDTO;
import com.projectmanager.backend.dto.response.ProjectIdResponseDTO;
import com.projectmanager.backend.dto.response.ProjectsResponseDTO;
import com.projectmanager.backend.repository.ProjectRepository;
import com.projectmanager.backend.repository.ProjectUserRepository;
import com.projectmanager.backend.service.ProjectUserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.projectmanager.backend.dto.response.ProjectCreateResponseDTO;
import com.projectmanager.backend.dto.request.ProjectCreateRequestDTO;
import com.projectmanager.backend.repository.UserRepository;
import com.projectmanager.backend.domain.User;
import com.projectmanager.backend.domain.Project;
import com.projectmanager.backend.domain.ProjectUser;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class ProjectUserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private ProjectUserRepository projectUserRepository;

    @InjectMocks
    private ProjectUserService projectService;

    @Test
    public void createProjectTest() {
        User user = User
                .builder()
                .id(1L)
                .name("tomasz")
                .username("tbogdan")
                .email("tomasz@example.com")
                .password("halo")
                .build();

        Project project = Project
                .builder()
                .id(1L)
                .name("project 1")
                .description("description 1")
                .build();

        ProjectUser projectUser = ProjectUser
                .builder()
                .id(1L)
                .project(project)
                .user(user)
                .isOwner(true)
                .build();

        ProjectCreateRequestDTO projectCreateRequestDTO = ProjectCreateRequestDTO
                .builder()
                .creatorId(user.getId())
                .name("project 1")
                .description("description 1")
                .build();

        userRepository.save(user);

        Mockito.when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        Mockito.when(projectRepository.save(Mockito.any(Project.class))).thenReturn(project);
        Mockito.when(projectUserRepository.save(projectUser)).thenReturn(projectUser);
        Mockito.when(projectRepository.findByName(Mockito.anyString())).thenReturn(Optional.empty());

        ProjectCreateResponseDTO projectCreateResponseDTO = projectService.createProject(projectCreateRequestDTO);

        assertEquals(1L, projectCreateResponseDTO.getProjectId());
        assertEquals(true, projectCreateResponseDTO.getStatus());
        assertEquals("Successfully", projectCreateResponseDTO.getInformation());
    }

    @Test
    public void getProjectByIdTest() {
        Project project = Project
                .builder()
                .id(1L)
                .name("project")
                .description("description")
                .build();

        Mockito.when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        ProjectIdResponseDTO projectIdResponseDTO = projectService.getProjectById(1L);

        assertEquals(project, projectIdResponseDTO.getProject());
    }

    @Test
    public void getProjectsTest() {
        Project project1 = Project
                .builder()
                .id(1L)
                .name("project 1")
                .description("description 1")
                .build();

        Project project2 = Project
                .builder()
                .id(2L)
                .name("project 2")
                .description("description 2")
                .build();

        Project project3 = Project
                .builder()
                .id(3L)
                .name("project 3")
                .description("description 3")
                .build();

        List<Project> projects = new ArrayList<>();
        projects.add(project1);
        projects.add(project2);
        projects.add(project3);

        Mockito.when(projectRepository.findAll()).thenReturn(projects);

        ProjectsResponseDTO projectsResponseDTO = projectService.getProjects();

        assertEquals(projects, projectsResponseDTO.getProjects());
    }

    @Test
    public void deleteProjectTest() {
        Project project = Project
                .builder()
                .id(1L)
                .name("project 1")
                .description("description 1")
                .build();

        User user = User
                .builder()
                .id(1L)
                .name("tomasz")
                .username("tbogdan")
                .email("tomasz@example.com")
                .password("password")
                .build();

        ProjectUser projectUser = ProjectUser
                .builder()
                .id(1L)
                .project(project)
                .user(user)
                .isOwner(true)
                .build();

        ProjectDeleteRequestDTO projectDeleteRequestDTO = ProjectDeleteRequestDTO
                .builder()
                .projectId(1L)
                .userId(1L)
                .build();

        Mockito.when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        Mockito.when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        Mockito.when(projectUserRepository.findByProjectAndUser(project, user)).thenReturn(Optional.of(projectUser));
        ProjectDeleteResponseDTO projectDeleteResponseDTO = projectService.deleteProject(projectDeleteRequestDTO);

        assertEquals(1L, projectDeleteResponseDTO.getProjectId());
        assertEquals(true, projectDeleteResponseDTO.getStatus());
        assertEquals("Successfully", projectDeleteResponseDTO.getInformation());
    }
}