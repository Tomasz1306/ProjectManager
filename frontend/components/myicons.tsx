import { cn } from "@heroui/theme";

export const IconWrapper = ({ children, className }) => (
    <div
      className={cn(
        className,
        "flex items-center rounded-small justify-center w-full h-full"
      )}
    >
      {children}
    </div>
  );
  
  export const BackendIcon = (props) => {
    return (
      <svg
        height="1em"
        viewBox="0 0 24 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="2"
          ry="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="3"
          y1="8"
          x2="21"
          y2="8"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="3"
          y1="16"
          x2="21"
          y2="16"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  };
  
  export const FrontendIcon = (props) => {
    return (
      <svg
        height="1em"
        viewBox="0 0 24 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="12"
          rx="1"
          ry="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="9"
          y1="20"
          x2="15"
          y2="20"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="12"
          y1="16"
          x2="12"
          y2="20"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  };
  
  export const BugfixIcon = (props) => {
    return (
      <svg
        height="1em"
        viewBox="0 0 24 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M16.895,6.519l2.813-2.812l-1.414-1.414l-2.846,2.846c-0.233-0.166-0.473-0.321-0.723-0.454 c-1.723-0.91-3.726-0.911-5.45,0c-0.25,0.132-0.488,0.287-0.722,0.453L5.707,2.293L4.293,3.707l2.813,2.812 C6.53,7.242,6.08,8.079,5.756,9H2v2h2.307C4.242,11.495,4.2,11.997,4.2,12.5c0,0.507,0.042,1.013,0.107,1.511H2v2h2.753 c0.013,0.039,0.021,0.08,0.034,0.118c0.188,0.555,0.421,1.093,0.695,1.6c0.044,0.081,0.095,0.155,0.141,0.234l-2.33,2.33 l1.414,1.414l2.11-2.111c0.235,0.254,0.478,0.498,0.736,0.716c0.418,0.354,0.867,0.657,1.332,0.903 c0.479,0.253,0.982,0.449,1.496,0.58C10.911,21.931,11.455,22,12,22s1.089-0.069,1.618-0.204c0.514-0.131,1.017-0.327,1.496-0.58 c0.465-0.246,0.914-0.55,1.333-0.904c0.258-0.218,0.5-0.462,0.734-0.716l2.111,2.111l1.414-1.414l-2.33-2.33 c0.047-0.08,0.098-0.155,0.142-0.236c0.273-0.505,0.507-1.043,0.694-1.599c0.013-0.039,0.021-0.079,0.034-0.118H22v-2h-2.308 c0.065-0.499,0.107-1.004,0.107-1.511c0-0.503-0.042-1.005-0.106-1.5H22V9h-3.756C17.92,8.079,17.47,7.242,16.895,6.519z M8.681,7.748c0.445-0.558,0.96-0.993,1.528-1.294c1.141-0.603,2.442-0.602,3.581,0c0.569,0.301,1.084,0.736,1.53,1.295 c0.299,0.373,0.54,0.8,0.753,1.251H7.927C8.141,8.549,8.381,8.121,8.681,7.748z M17.8,12.5c0,0.522-0.042,1.044-0.126,1.553 c-0.079,0.49-0.199,0.973-0.355,1.436c-0.151,0.449-0.34,0.882-0.559,1.288c-0.217,0.399-0.463,0.772-0.733,1.11 c-0.267,0.333-0.56,0.636-0.869,0.898c-0.31,0.261-0.639,0.484-0.979,0.664s-0.695,0.317-1.057,0.41 c-0.04,0.01-0.082,0.014-0.122,0.023V14h-2v5.881c-0.04-0.009-0.082-0.013-0.122-0.023c-0.361-0.093-0.717-0.23-1.057-0.41 s-0.669-0.403-0.978-0.664c-0.311-0.263-0.604-0.565-0.871-0.899c-0.27-0.337-0.516-0.71-0.731-1.108 c-0.22-0.407-0.408-0.84-0.56-1.289c-0.156-0.463-0.276-0.946-0.356-1.438C6.242,13.544,6.2,13.022,6.2,12.5 c0-0.505,0.041-1.009,0.119-1.5h11.361C17.759,11.491,17.8,11.995,17.8,12.5z"
          fill="currentColor"
        />
      </svg>
    );
  };

  export const LowPriorityIcon = (props) => {
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <circle cx="12" cy="12" r="2" />
      </svg>
    );
  };
  
  export const MediumPriorityIcon = (props) => {
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="7" x2="12" y2="13" />
        <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  };
  
  export const HighPriorityIcon = (props) => {
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        {...props}
      >
        <polygon points="12,2 22,20 2,20" />
        <line x1="12" y1="8" x2="12" y2="14" />
        <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  };
  
  
  export const EnhancementIcon = (props) => {
    return (
      <svg
        height="1em"
        viewBox="0 0 24 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M12 2l2.09 6.26L20 9l-5 3.64L16.18 20 12 16.77 7.82 20 9 12.64 4 9l5.91-.74L12 2z"
          fill="currentColor"
        />
      </svg>
    );
  };
  
  export const UrgentIcon = (props) => {
    return (
      <svg
        height="1em"
        viewBox="0 0 24 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <rect x="11" y="6" width="2" height="8" fill="white" />
        <rect x="11" y="16" width="2" height="2" fill="white" />
      </svg>
    );
  };
  
  export const RefactorIcon = (props) => {
    return (
      <svg
        height="1em"
        viewBox="0 0 24 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.05-.27 2.03-.74 2.88l1.46 1.46C19.06 14.79 19.2 13.42 19.2 12c0-4.42-3.58-8-8-8zm-7.66 5.34l1.41 1.41C5.27 9.97 5 10.95 5 12c0 1.42.14 2.79.43 4.06l-1.46 1.46C3.27 15.03 3 13.05 3 12c0-1.05.27-2.03.34-2.66zM12 20v3l4-4-4-4v3c-3.31 0-6-2.69-6-6 0-1.05.27-2.03.74-2.88l-1.46-1.46C4.94 9.21 4.8 10.58 4.8 12c0 4.42 3.58 8 8 8z"
          fill="currentColor"
        />
      </svg>
    );
  };
  
  export const DocumentationIcon = (props) => {
    return (
      <svg
        height="1em"
        viewBox="0 0 24 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 0l6 6h-6z"
          fill="currentColor"
        />
        <path d="M14 2v6h6" fill="none" stroke="white" strokeWidth="2" />
      </svg>
    );
  };
  
  export const TestingIcon = (props) => {
    return (
      <svg
        height="1em"
        viewBox="0 0 24 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M9 16l-3-3 1.41-1.41L9 13.17l7.59-7.59L18 7l-8 8z"
          fill="currentColor"
        />
      </svg>
    );
  };
  
  export const ResearchIcon = (props) => {
    return (
      <svg
        height="1em"
        viewBox="0 0 24 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle
          cx="11"
          cy="11"
          r="8"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="16"
          y1="16"
          x2="22"
          y2="22"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  };
  
  export const DesignIcon = (props) => {
    return (
      <svg
        height="1em"
        viewBox="0 0 24 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M12 2C7.03 2 3 6.03 3 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16.2A7.2 7.2 0 1 1 12 4.8a7.2 7.2 0 0 1 0 14.4z"
          fill="currentColor"
        />
        <circle cx="12" cy="11" r="3" fill="currentColor" />
      </svg>
    );
  };

export const TaskIcon = (props) => {
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M3 4h18v2H3V4zm0 6h12v2H3v-2zm0 6h8v2H3v-2zm14.59-4l-2.3-2.29 1.41-1.42 0.88 0.88 2.3-2.3 1.42 1.42L19 11.42l2.3 2.29-1.42 1.42-2.3-2.3-0.88 0.88-1.41-1.42z" />
      </svg>
    );
  };
  
  export const FeatureIcon = (props) => {
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M12 2l2.92 5.9 6.52.95-4.72 4.59 1.11 6.47L12 17.77 6.17 20.9l1.11-6.47-4.72-4.59 6.52-.95L12 2z" />
      </svg>
    );
  };
  
  export const BugIcon = (props) => {
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M16.895,6.519l2.813-2.812l-1.414-1.414l-2.846,2.846
          c-0.233-0.166-0.473-0.321-0.723-0.454c-1.723-0.91-3.726-0.911-5.45,0c-0.25,0.132-0.488,0.287-0.722,0.453L5.707,2.293L4.293,3.707
          l2.813,2.812C6.53,7.242,6.08,8.079,5.756,9H2v2h2.307C4.242,11.495,4.2,11.997,4.2,12.5c0,0.507,0.042,1.013,0.107,1.511H2v2h2.753
          c0.013,0.039,0.021,0.08,0.034,0.118c0.188,0.555,0.421,1.093,0.695,1.6c0.044,0.081,0.095,0.155,0.141,0.234l-2.33,2.33l1.414,1.414
          l2.11-2.111c0.235,0.254,0.478,0.498,0.736,0.716c0.418,0.354,0.867,0.657,1.332,0.903c0.479,0.253,0.982,0.449,1.496,0.58
          C10.911,21.931,11.455,22,12,22s1.089-0.069,1.618-0.204c0.514-0.131,1.017-0.327,1.496-0.58c0.465-0.246,0.914-0.55,1.333-0.904
          c0.258-0.218,0.5-0.462,0.734-0.716l2.111,2.111l1.414-1.414l-2.33-2.33c0.047-0.08,0.098-0.155,0.142-0.236
          c0.273-0.505,0.507-1.043,0.694-1.599c0.013-0.039,0.021-0.079,0.034-0.118H22v-2h-2.308c0.065-0.499,0.107-1.004,0.107-1.511
          c0-0.503-0.042-1.005-0.106-1.5H22V9h-3.756C17.92,8.079,17.47,7.242,16.895,6.519z M8.681,7.748
          c0.445-0.558,0.96-0.993,1.528-1.294c1.141-0.603,2.442-0.602,3.581,0c0.569,0.301,1.084,0.736,1.53,1.295
          c0.299,0.373,0.54,0.8,0.753,1.251H7.927C8.141,8.549,8.381,8.121,8.681,7.748z M17.8,12.5c0,0.522-0.042,1.044-0.126,1.553
          c-0.079,0.49-0.199,0.973-0.355,1.436c-0.151,0.449-0.34,0.882-0.559,1.288c-0.217,0.399-0.463,0.772-0.733,1.11
          c-0.267,0.333-0.56,0.636-0.869,0.898c-0.31,0.261-0.639,0.484-0.979,0.664s-0.695,0.317-1.057,0.41
          c-0.04,0.01-0.082,0.014-0.122,0.023V14h-2v5.881c-0.04-0.009-0.082-0.013-0.122-0.023c-0.361-0.093-0.717-0.23-1.057-0.41
          s-0.669-0.403-0.978-0.664c-0.311-0.263-0.604-0.565-0.871-0.899c-0.27-0.337-0.516-0.71-0.731-1.108
          c-0.22-0.407-0.408-0.84-0.56-1.289c-0.156-0.463-0.276-0.946-0.356-1.438C6.242,13.544,6.2,13.022,6.2,12.5
          c0-0.505,0.041-1.009,0.119-1.5h11.361C17.759,11.491,17.8,11.995,17.8,12.5z" />
      </svg>
    );
  };



<div className="flex flex-col justify-center">
<div className="size-10 border-1">
  <IconWrapper className="bg-primary/10 text-primary">
    <BackendIcon className="text-lg" />
  </IconWrapper>
</div>
<div className="size-10 border-1">
  <IconWrapper className="bg-secondary/10 text-secondary">
    <FrontendIcon className="text-lg" />
  </IconWrapper>
</div>
<div className="size-10 border-1">
  <IconWrapper className="bg-danger/10 text-danger">
    <BugfixIcon className="text-lg" />
  </IconWrapper>
</div>
<div className="size-10 border-1">
  <IconWrapper className="bg-warning/10 text-warning">
    <EnhancementIcon className="text-lg" />
  </IconWrapper>
</div>
<div className="size-10 border-1">
  <IconWrapper className="bg-danger/10 text-danger">
    <UrgentIcon className="text-lg" />
  </IconWrapper>
</div>
<div className="size-10 border-1">
  <IconWrapper className="bg-warning/10 text-warning">
    <RefactorIcon className="text-lg" />
  </IconWrapper>
</div>
<div className="size-10 border-1">
  <IconWrapper className="bg-default/10 text-default">
    <DocumentationIcon className="text-lg" />
  </IconWrapper>
</div>
<div className="size-10 border-1">
  <IconWrapper className="bg-success/10 text-success">
    <TestingIcon className="text-lg" />
  </IconWrapper>
</div>
<div className="size-10 border-1">
  <IconWrapper className="bg-secondary/10 text-secondary">
    <ResearchIcon className="text-lg" />
  </IconWrapper>
</div>
<div className="size-10 border-1">
  <IconWrapper className="bg-primary/10 text-primary">
    <DesignIcon className="text-lg" />
  </IconWrapper>
</div>
</div>