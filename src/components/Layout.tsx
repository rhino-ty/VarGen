import Header from "./Header";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}
