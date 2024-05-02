const App = () => {
  interface HeaderProps {
    title: string;
  }

  interface CourseProps {
    courses: CourseInfo[];
  }

  interface CourseInfo {
    name: string;
    exerciseCount: number;
  }

  interface TotalProps {
    exerciseTotal: number;
  }

  const Header = (props: HeaderProps) => {
    return <h1>Hello, {props.title}</h1>;
  };

  const Content = (props: CourseProps) => {
    return props.courses.map((course) => (
      <p>
        {course.name} {course.exerciseCount}
      </p>
    ));
  };

  const Total = (props: TotalProps) => {
    return <p>Number of exercises {props.exerciseTotal}</p>;
  };

  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header title={courseName} />
      <Content courses={courseParts} />
      <Total exerciseTotal={totalExercises} />
    </div>
  );
};

export default App;
