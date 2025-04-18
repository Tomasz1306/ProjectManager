
package com.projectmanager.backend.serviceTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.projectmanager.backend.domain.Role;
import com.projectmanager.backend.dto.request.AddUserToProjectRequestDTO;
import com.projectmanager.backend.dto.request.ProjectDeleteRequestDTO;
import com.projectmanager.backend.dto.request.ProjectUsersRequestDTO;
import com.projectmanager.backend.dto.response.*;
import com.projectmanager.backend.repository.ProjectRepository;
import com.projectmanager.backend.repository.ProjectUserRepository;
import com.projectmanager.backend.service.ProjectUserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

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

    @Test
    public void getUserProjectsTest() {
        Project project1 = Project
                .builder()
                .id(1L)
                .name("project 1")
                .description("description 1")
                .build();
        Project project3 = Project
                .builder()
                .id(3L)
                .name("project 3")
                .description("description 3")
                .build();

        List<Project> projects = new ArrayList<>();
        projects.add(project1);
        projects.add(project3);

        User user = User
                .builder()
                .id(1L)
                .name("tomasz")
                .username("tbogdan")
                .email("tomasz@example.com")
                .password("password")
                .build();

        ProjectUser projectUser1 = ProjectUser
                .builder()
                .id(1L)
                .project(project1)
                .user(user)
                .isOwner(true)
                .build();
        ProjectUser projectUser3 = ProjectUser
                .builder()
                .id(3L)
                .project(project3)
                .user(user)
                .isOwner(true)
                .build();

        List<ProjectUser> userProjects = new ArrayList<>();
        userProjects.add(projectUser1);
        userProjects.add(projectUser3);

        Mockito.when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        Mockito.when(projectUserRepository.findByUser(user)).thenReturn(userProjects);
        Mockito.when(projectRepository.findById(1L)).thenReturn(Optional.of(project1));
        Mockito.when(projectRepository.findById(3L)).thenReturn(Optional.of(project3));
        ProjectsResponseDTO projectsResponseDTO = projectService.getUserProjects(1L);

        assertEquals(projects, projectsResponseDTO.getProjects());
    }

    @Test
    public void getProjectUsersTest() {
        Project project = Project
                .builder()
                .id(1L)
                .name("project 1")
                .description("description 1")
                .build();

        User user1 = User
                .builder()
                .id(1L)
                .name("User 1")
                .email("user1@example.com")
                .password("password1")
                .build();
        User user2 = User
                .builder()
                .id(2L)
                .name("User 2")
                .email("user2@example.com")
                .password("password2")
                .build();
        User user3 = User
                .builder()
                .id(3L)
                .name("User 3")
                .email("user3@example.com")
                .password("password3")
                .build();

        ProjectUser projectUser1 = ProjectUser
                .builder()
                .user(user1)
                .project(project)
                .isOwner(true)
                .projectRole(Role.PROJECT_MANAGER)
                .build();
        ProjectUser projectUser2 = ProjectUser
                .builder()
                .user(user2)
                .project(project)
                .isOwner(false)
                .projectRole(Role.DESIGNER)
                .build();
        ProjectUser projectUser3 = ProjectUser
                .builder()
                .user(user3)
                .project(project)
                .isOwner(false)
                .projectRole(Role.QA_ENGINEER)
                .build();

        List<ProjectUser> projectUsers = new ArrayList<>();
        projectUsers.add(projectUser1);
        projectUsers.add(projectUser2);
        projectUsers.add(projectUser3);

        List<ProjectUserDTO> projectUsersDTO = new ArrayList<>();
        projectUsersDTO.add(ProjectUserDTO
                .builder()
                .id(projectUser1.getId())
                .user(UserDTO.builder()
                        .id(projectUser1.getUser().getId())
                        .name(projectUser1.getUser().getName())
                        .email(projectUser1.getUser().getEmail())
                        .username(projectUser1.getUser().getUsername())
                        .build())
                .project(projectUser1.getProject())
                .role(projectUser1.getProjectRole().name())
                .owner(projectUser1.getIsOwner())
                .build());
        projectUsersDTO.add(ProjectUserDTO
                .builder()
                .id(projectUser2.getId())
                .user(UserDTO.builder()
                        .id(projectUser2.getUser().getId())
                        .name(projectUser2.getUser().getName())
                        .email(projectUser2.getUser().getEmail())
                        .username(projectUser2.getUser().getUsername())
                        .build())
                .project(projectUser2.getProject())
                .role(projectUser2.getProjectRole().name())
                .owner(projectUser2.getIsOwner())
                .build());
        projectUsersDTO.add(ProjectUserDTO
                .builder()
                .id(projectUser3.getId())
                .user(UserDTO.builder()
                        .id(projectUser3.getUser().getId())
                        .name(projectUser3.getUser().getName())
                        .email(projectUser3.getUser().getEmail())
                        .username(projectUser3.getUser().getUsername())
                        .build())
                .project(projectUser3.getProject())
                .role(projectUser3.getProjectRole().name())
                .owner(projectUser3.getIsOwner())
                .build());

        ProjectUsersRequestDTO request = ProjectUsersRequestDTO
                .builder()
                .projectId(1L)
                .userId(1L)
                .build();

        Mockito.when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user1));
        Mockito.when(projectUserRepository.findByProjectAndUser(project, user1)).thenReturn(Optional.of(projectUser1));
        Mockito.when(projectUserRepository.findByProject(project)).thenReturn(projectUsers);

        ProjectUsersResponseDTO response = projectService.getProjectUsers(request);

        assertEquals(projectUsersDTO, response.getProjectUsers());
    }

    @Test
    public void addUserToProjectTest() {
        Project project = Project
                .builder()
                .id(1L)
                .name("project 1")
                .description("description 1")
                .build();

        User userToAdd = User
                .builder()
                .id(2L)
                .name("User 2")
                .email("user2@example.com")
                .password("password2")
                .build();

        UserDTO userToAddDTO = UserDTO
                .builder()
                .id(2L)
                .name("User 2")
                .email("user2@example.com")
                .username(userToAdd.getUsername())
                .build();

        ProjectUser projectUserToAdd = ProjectUser
                .builder()
                .id(1L)
                .user(userToAdd)
                .project(project)
                .isOwner(false)
                .projectRole(Role.DEVELOPER)
                .build();

        ProjectUserDTO projectUserToAddDTO = ProjectUserDTO
                .builder()
                .project(project)
                .user(userToAddDTO)
                .id(1L)
                .owner(false)
                .role("DEVELOPER")
                .build();

        AddUserToProjectRequestDTO request = AddUserToProjectRequestDTO
                .builder()
                .projectId(project.getId())
                .owner(true)
                .user(userToAddDTO)
                .build();

        Mockito.when(userRepository.findById(2L)).thenReturn(Optional.of(userToAdd));
        Mockito.when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        Mockito.when(projectUserRepository.save(Mockito.any(ProjectUser.class))).thenReturn(projectUserToAdd);
        AddUserToProjectResponseDTO response = projectService.addUserToProject(request);

        assertEquals("Successfully", response.getInformation());
        assertEquals(true, response.isStatus());
        assertEquals(projectUserToAddDTO, response.getProjectUser());
    }
}