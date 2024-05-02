const App = () => {
  interface HeaderProps {
    title: string;
  }

  interface CourseProps {
    courses: CoursePart[];
  }

  interface TotalProps {
    exerciseTotal: number;
  }

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartDescription {
    kind: 'basic';
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: 'group';
  }

  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: 'background';
  }

  interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: 'special';
  }

  interface Part {
    course: CoursePart;
  }

  type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial;

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial:
        'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special',
    },
  ];

  const courseName = 'Half Stack application development';

  const Header = (props: HeaderProps) => {
    return <h1>{props.title}</h1>;
  };

  const Content = (props: CourseProps) => {
    return props.courses.map((course) => (
      <p>
        <Part {...course} />
      </p>
    ));
  };

  const Total = (props: TotalProps) => {
    return <p>Number of exercises {props.exerciseTotal}</p>;
  };

  const Part = (course: CoursePart) => {
    switch (course.kind) {
      case 'basic':
        return (
          <div>
            <div>
              <b>
                {course.name} {course.exerciseCount}
              </b>
            </div>
            <div>
              <em>{course.description}</em>
            </div>
          </div>
        );
      case 'group':
        return (
          <div>
            <div>
              <b>
                {course.name} {course.exerciseCount}
              </b>
            </div>
            <div>project exercises {course.groupProjectCount}</div>
          </div>
        );
        break;
      case 'background':
        return (
          <div>
            <div>
              <b>
                {course.name} {course.exerciseCount}
              </b>
            </div>
            <div>
              <em>{course.description}</em>
            </div>
            <div>submit to {course.backgroundMaterial}</div>
          </div>
        );
      case 'special':
        return (
          <div>
            <div>
              <b>
                {course.name} {course.exerciseCount}
              </b>
            </div>
            <div>
              <em>{course.description}</em>
            </div>
            <div>required skills: {createList(course.requirements)}</div>
          </div>
        );
      default:
        return assertNever(course);
    }
  };

  const createList = (items: string[]) => {
    if (items.length === 0) return 'none';
    if (items.length === 1) return items[0];
    return items.join(', ');
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

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
